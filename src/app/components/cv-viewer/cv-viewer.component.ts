import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-cv-viewer',
    imports: [],
    templateUrl: './cv-viewer.component.html',
    styleUrl: './cv-viewer.component.scss'
})
export class CvViewerComponent {
  pdfUrl: SafeResourceUrl;
  downloadUrl = 'assets/documents/cv-mike-diethelm.pdf';

  constructor(private sanitizer: DomSanitizer) {
    // Sanitize the URL for safe embedding
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadUrl);
  }

  downloadPdf() {
    const link = document.createElement('a');
    link.href = this.downloadUrl;
    link.download = 'CV_Mike_Diethelm.pdf';
    link.click();
  }

  openInNewTab() {
    window.open(this.downloadUrl, '_blank');
  }
}
