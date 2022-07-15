
interface Owner {
   display_name:string;
    
}

interface Items {
    name: string;
    owner:Record<string, Owner>;
    
}




export interface playlists  {
    items : Record<string, Items>;
}

