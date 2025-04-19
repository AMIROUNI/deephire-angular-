// file-utils.ts
export class FileUtils {
    static toBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the metadata (e.g., "data:application/pdf;base64,")
          const base64 = result.split(',')[1];
          resolve(base64);
        };
  
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    }
    //Base64 to Blob

   static base64ToBlob(base64: string, mimeType: string): Blob {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
      
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
      
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
      }

//Download the File

    /*  downloadFile(base64Data: string, filename: string, mimeType: string) {
        const blob = this.base64ToBlob(base64Data, mimeType);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }*/
      

//Case 2: Preview the File in Browser (e.g., Image/PDF)
// static   previewFile(base64Data: string, mimeType: string) {
    //    const blob = this.base64ToBlob(base64Data, mimeType);
    //    const url = window.URL.createObjectURL(blob);
   //     window.open(url);
   //   }
//You can extract both the MIME type and the base64 content like this:
  static parseBase64DataUrl(dataUrl: string): { base64: string, mimeType: string } {
    const [meta, base64] = dataUrl.split(',');
    const mimeType = meta.match(/:(.*?);/)?.[1] || 'application/octet-stream';
    return { base64, mimeType };
  }}