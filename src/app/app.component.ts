import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {


  serverElements = [{type: 'server', name: 'Testserver', content: 'Just a test!'}];



  title = 'deephire';


  server: {type: string, name: string, content: string}[] = [];


  onElementAdded(elementData: {type: string, name: string, content: string}) {
    this.server.push({
      type: elementData.type,
      name: elementData.name,
      content: elementData.content
    });



}

}
