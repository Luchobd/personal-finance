
    export type RemoteKeys = 'ui/login';
    type PackageType<T> = T extends 'ui/login' ? typeof import('ui/login') :any;