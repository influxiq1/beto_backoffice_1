import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.css']
})
export class VideoLibraryComponent implements OnInit {

  constructor(public modal: BsModalService) { }

  public modalReference: BsModalRef;

  UTAvideolibrary = [
    {id: '1',    image: '../../assets/images/video_gallery_img1.jpg', subtitle: 'UTA-Media Deck ', },
    {id: '2',    image: '../../assets/images/video_gallery_img2.jpg', subtitle: 'UTA-Call Script', },
    {id: '3',    image: '../../assets/images/video_gallery_img3.jpg', subtitle: 'UTA-Contract Review', },

];


Apogeevideolibrary = [
  {id: '1',    image: '../../assets/images/video_gallery_img4.jpg', subtitle: 'ApogeeINVENT-Media Deck', },
  {id: '2',    image: '../../assets/images/video_gallery_img5.jpg', subtitle: 'ApogeeINVENT-Call Script', },
  {id: '3',    image: '../../assets/images/video_gallery_img6.jpg', subtitle: 'ApogeeINVENT-Contract Review', },

];


Geovideolibrary = [
  {id: '1',    image: '../../assets/images/video_gallery_img7.jpg', subtitle: 'GeoFenceDSP-Media Deck', },
  {id: '2',    image: '../../assets/images/video_gallery_img8.jpg', subtitle: 'GeoFenceDSP-Call Script', },
  {id: '3',    image: '../../assets/images/video_gallery_img9.jpg', subtitle: 'GeoFenceDSP-Contract Review', },

];


Heliosvideolibrary = [
  {id: '1',    image: '../../assets/images/video_gallery_img10.jpg', subtitle: 'Helios Medical Marketing-Media Deck', },
  {id: '2',    image: '../../assets/images/video_gallery_img11.jpg', subtitle: 'Helios Medical Marketing-Call Script', },
  {id: '3',    image: '../../assets/images/video_gallery_img12.jpg', subtitle: 'Helios Medical Marketing-Contract Review ', },

];

Advancedvideolibrary = [
  {id: '1',    image: '../../assets/images/video_gallery_img13.jpg', subtitle: 'Advanced Wellness Solutions-Media Deck', },
  {id: '2',    image: '../../assets/images/video_gallery_img14.jpg', subtitle: 'Advanced Wellness Solutions-Call Script', },
  {id: '3',    image: '../../assets/images/video_gallery_img15.jpg', subtitle: 'Advanced Wellness Solutions-Contract Review ', },

];

Medworldvideolibrary = [
  {id: '1',    image: '../../assets/images/video_gallery_img16.jpg', subtitle: 'MedworldOne-Media Deck', },
  {id: '2',    image: '../../assets/images/video_gallery_img17.jpg', subtitle: 'MedworldOne-Call Script', },
  {id: '3',    image: '../../assets/images/video_gallery_img18.jpg', subtitle: 'MedworldOne-Contract Review ', },

];

  ngOnInit() {

    console.warn(this.UTAvideolibrary);
    console.warn(this.Apogeevideolibrary);
    console.warn(this.Geovideolibrary);
    console.warn(this.Heliosvideolibrary);
    console.warn(this.Advancedvideolibrary);
    console.warn(this.Medworldvideolibrary);
  }

// openvideoModal(template:TemplateRef<any>){
//   this.modalReference = this.modal.show(template);

// }

}



