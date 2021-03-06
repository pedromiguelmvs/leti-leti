import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentImageId: any;
  shake: boolean;
  images: any = [
    {
      id: 'animal',
      name: 'doguinho',
      path: 'assets/dog.png',
    },
    {
      id: 'fruit',
      name: 'frutinha',
      path: 'assets/banana.png',
    },
    {
      id: 'animal',
      name: 'doguinho2',
      path: 'assets/sog2.jpg',
    },
  ];

  allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

  drag(ev: DragEvent) {
    const target = ev.target as Element;
    this.currentImageId = target.id;
  }

  drop(ev: DragEvent) {
    ev.preventDefault();
    let target = ev.target as Element;

    /* If tag that the image is dropped be a Img, get the parentElement */
    if (target.tagName === 'IMG') {
      target = target.parentElement as Element;
    }

    /* Get the current image dragged */
    const foundImage = this.images.find(
      (item: any) => item.id === this.currentImageId
    );

    /* Elements that already in selected box */
    const elementsAlreadyInList = document.querySelectorAll(
      `div[id=${target.id}]`
    );

    /* If target has invalid, shake selected box */
    if (target.id !== foundImage.id) {
      elementsAlreadyInList.forEach((element) => {
        this.makesShake(element as HTMLElement);
      });

      return;
    }

    target.appendChild(
      document.getElementById(foundImage.id) as HTMLImageElement
    );
  }

  makesShake(element: HTMLElement | null): void {
    element?.classList.remove('shake');
    void element?.offsetWidth;
    element?.classList.add('shake');
  }
}
