<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Export Novel</h2>
      <div class="chapters-list">
        <label v-for="chapter in chapters" :key="chapter.uuid">
          <input type="checkbox" :value="chapter" v-model="selectedChapters" />
          {{ chapter.title }}
        </label>
      </div>
      
      <div class="formats">
        <label>Export Name: </label>
        <input type="text" v-model="exportName" style="margin-bottom: 10px; width: 100%; padding: 5px;" />
        <br />
        <label>Format: </label>
        <select v-model="selectedFormat">
          <option value="txt">TXT</option>
          <option value="pdf">PDF</option>
          <option value="epub">EPUB</option>
          <option value="doc">Word (.doc)</option>
        </select>
      </div>

      <div class="actions">
        <button class="interfaceBtn" @click="doExport">Export</button>
        <button class="interfaceBtn" @click="$emit('close')" style="background: var(--button-hover)">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'
import Epub from 'epub-gen-memory'

export default {
  name: 'ExportModal',
  props: ['files'],
  data() {
    return {
      chapters: this.files.filter(f => f.type === 'folder' || f.type === 'chapter'),
      selectedChapters: [],
      selectedFormat: 'txt',
      exportName: 'Novel',
      exportObject: {}
    }
  },
  created() {
    this.selectedChapters = [...this.chapters];
    this.exportName = this.$root.session.writer.selected.title || 'Novel';
  },
  methods: {
    async doExport() {
      // Sort selected chapters based on original order
      let orderedSelected = this.chapters.filter(c => this.selectedChapters.includes(c));
      
      // Fetch contents
      let arr = await this.$root.db.Files.where({ writerid: this.$root.session.writer.selected.uuid }).toArray()
      this.exportObject = {}
      arr.forEach(file => {
        this.exportObject[file.uuid] = file
      })
      
      let htmlContent = '';
      let textContent = '';
      let epubChapters = [];

      orderedSelected.forEach(chapter => {
        htmlContent += `<h1>${chapter.title}</h1>`;
        textContent += `\n\n${chapter.title}\n\n`;
        
        let chapterHtml = '';
        if (chapter.children) {
          chapter.children.forEach(scene => {
            let sceneFile = this.exportObject[scene.uuid];
            if (sceneFile) {
              chapterHtml += `<h2>${sceneFile.title}</h2>${sceneFile.content}`;
              
              let strippedContent = (sceneFile.content || '')
                .replace(/<p[^>]*>/g, '\n')
                .replace(/<\/p>/g, '\n')
                .replace(/<[^>]+>/g, '');
                
              textContent += `\n${sceneFile.title}\n${strippedContent}\n`;
            }
          });
        }
        htmlContent += chapterHtml;
        epubChapters.push({
            title: chapter.title,
            content: `<h1>${chapter.title}</h1>` + chapterHtml
        });
      });

      const title = this.exportName || 'Novel';

      if (this.selectedFormat === 'txt') {
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.txt`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (this.selectedFormat === 'pdf') {
        const opt = {
          margin:       0.5,
          filename:     `${title}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(`<div>${htmlContent}</div>`).save();
      } else if (this.selectedFormat === 'epub') {
        const options = {
            title: title,
            author: this.$root.session.writer.selected.description || 'Author'
        };
        try {
            const buffer = await Epub(options, epubChapters);
            const blob = new Blob([buffer], { type: 'application/epub+zip' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title}.epub`;
            a.click();
            URL.revokeObjectURL(url);
        } catch(e) {
            console.error('EPUB Error', e);
        }
      } else if (this.selectedFormat === 'doc') {
        window.Export2Word(htmlContent, `${title}.doc`);
      }
      
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: var(--writer-side-panels, #fff);
  color: var(--writer-side-panels-f, #000);
  padding: 20px;
  border-radius: 8px;
  min-width: 350px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}
.chapters-list {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--button-hover);
  padding: 10px;
  border-radius: 4px;
}
.chapters-list label {
  cursor: pointer;
  padding: 5px;
}
.chapters-list label:hover {
  background: var(--button-hover);
}
.formats {
  margin: 15px 0;
}
.formats select {
  padding: 5px;
  font-size: 1rem;
}
.actions {
  margin-top: 20px;
  text-align: right;
}
.actions button {
  margin-left: 10px;
  padding: 8px 15px;
  cursor: pointer;
  border: 0;
  border-radius: 4px;
}
</style>
