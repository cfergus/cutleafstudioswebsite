export interface IKnife {
  name: string;
  id?: string;
  shortDescription?: string;
  longDescription?: string;

  primaryImage: IKnifeImage;
  additionalImages?: IKnifeImage[];

  // attributes
  // steel?: string;
  // grind?: string;
  // hardness?: string; // Dimension?

  // handleMaterials?: string; // array?  // { material: "nickel silver", usage: "pins" }

  // dimensions
  dimLength?: Dimension;
  dimWidth?: Dimension;
  dimThickness?: Dimension;

  dimBladeLength?: Dimension;


  dimWeight?: Dimension;
}

export class Knife {

  // TODO : Reusable placeholder image

  name = '';

  // dimensions
  // TODO : constructor using https://github.com/ben-ng/convert-units , accepting (24, "mm")
  dimLength = { magnitude: 10000, unit: 'mm' };
  dimWidth = { magnitude: 1500, unit: 'mm' };
  dimThickness = { magnitude: 250, unit: 'mm' };

  dimBladeLength = { magnitude: 1500, unit: 'mm' };
  dimWeight = { magnitude: 200, unit: 'g' };

  // images
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

export interface Dimension {
  magnitude: number;
  unit: string;
}
