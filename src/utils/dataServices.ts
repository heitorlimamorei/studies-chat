interface IFirebaseRespItemProps {
    id: string;
    data: () => any;
}
export const normalizeFirebaseRespItems = (items: IFirebaseRespItemProps[]): any[] => {
    let normalized:any[] = [];
    items.forEach((item:IFirebaseRespItemProps) => normalized.push({
        id: item.id,
        ...item.data()
    }) )
    return normalized;
}