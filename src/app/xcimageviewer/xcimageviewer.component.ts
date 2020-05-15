import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

// Refenance to JS Viewer
declare var Viewer: any;

@Component({
  selector: 'app-xcimageviewer',
  templateUrl: './xcimageviewer.component.html',
  styleUrls: ['./xcimageviewer.component.css']
})
export class XcimageviewerComponent implements OnInit, AfterViewInit, OnDestroy {
  // variable for viewer
  viewer: any;
  // DOM element reference 
  @ViewChild('galley') galley: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    // console.log(this.galley.nativeElement.innerHTML);
    this.viewer = new Viewer(this.galley.nativeElement, {
      inline: true,
      url: 'data-original',
    });

    this.viewer.show();
  }

  ngOnDestroy() {
    this.viewer.destroy();
  }
}
