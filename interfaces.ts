export interface ICategory {
  id: string;
  title: string;
}

// export interface IFile {
//     name: string;
//     percent: number;
//     size: number;
//     status: "error" | "success" | "done" | "uploading" | "removed";
//     type: string;
//     uid: string;
//     url: string;
// }

export interface IPost {
  id: string;
  createdAt: string;
  promptTmpl: string;
  data: string;
  categoryId: string;

  categories: ICategory[];
}
