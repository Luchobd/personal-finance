
    export type RemoteKeys = 'common/button' | 'common/input';
    type PackageType<T> = T extends 'common/input' ? typeof import('common/input') :T extends 'common/button' ? typeof import('common/button') :any;