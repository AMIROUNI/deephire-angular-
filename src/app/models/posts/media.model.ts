export interface Media {
    type: 'image' | 'video' | 'document';
    url: string;
  }
  
  export const sampleMedia: Media[] = [
    { type: "image", url: "assets/post1-image.jpg" },
    { type: "video", url: "assets/post2-video.mp4" },
    { type: "document", url: "assets/report.pdf" }
  ];