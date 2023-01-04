export interface IPost {
    id: number,
    image: string,
    categories: Array<{ name: string, id: number }>,
    title: string,
    subtitle: string,
    body: string,
    files: Array<{ id: number, name: string }>
}