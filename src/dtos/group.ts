export interface Image {
  id: number;

  filename: string;

  url: string;
}
;

export interface Group {
  id: number;

  name: string;

  description: string;

  images: Image[];
}