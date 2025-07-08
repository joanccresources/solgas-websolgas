
export interface ItemsNavigationMenu {
    id: string
    title: string
    subItems?: ItemNavigationMenu[]
    path?: string,
}


export interface ItemNavigationMenu { 
    id: string
    title: string 
    path: string
    subItems?: {
        id: string
        title: string 
        path: string
    }[]
}