
    export type RemoteKeys = 'common/button';
    type PackageType<T> = T extends 'common/button' ? typeof import('common/button') :any;