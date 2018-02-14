export interface IKnife {
  name: string;
  id?: string;
  // length: any;
  primaryImage: IKnifeImage;
  additionalImages?: IKnifeImage[];
}

export class Knife {
  name: string;
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
