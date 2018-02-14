export interface IKnife {
  name: string;
  id?: string;
  // length: any;
  primaryImage: IKnifeImage;
  additionalImages?: IKnifeImage[];
}

export class Knife {

  // TODO : Reusable placeholder image

  name = '';
  additionalImages = [];
  primaryImage = {
    storageRef: '',
    url: '',
    description: 'Knife image coming soon'
  }
}

export interface IKnifeImage {
  storageRef: string;
  url: string;
  description: string;
}


export class KnifeImage {
  url = '';
  description = '';

}
