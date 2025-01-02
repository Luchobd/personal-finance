
    export type RemoteKeys = 'core/store';
    type PackageType<T> = T extends 'core/store' ? typeof import('core/store') :any;