export interface IsUniqueProps {
    prop: string;
    value: string;
    ignoreId?: string;
}

export interface BuscarUmProps {
    query: any;
}
export interface DeletarProps {
    id: string;
}

export interface Repository<T> {
    inserir(item: T): Promise<T>;
    editar(editar: T): Promise<T>;
    buscarUm(props: BuscarUmProps): Promise<T | null>;
    listar(): Promise<T[]>;
    isUnique(props: IsUniqueProps): Promise<boolean>;
    deletar(props: DeletarProps): Promise<boolean>;
}