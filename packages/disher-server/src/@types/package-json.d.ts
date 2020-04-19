declare module "package-json" {
  export interface PackageJSON extends Object {
    author?: string | Author;
    bin?: string | BinMap;
    bugs?: string | Bugs;
    bundledDependencies?: string[];
    config?: Config;
    contributors?: string[] | Author[];
    cpu?: string[];
    dependencies?: DependencyMap;
    description?: string;
    devDependencies?: DependencyMap;
    directories?: Directories;
    engines?: Engines;
    files?: string[];
    homepage?: string;
    keywords?: string[];
    license?: string;
    main?: string;
    man?: string | string[];
    name: string;
    optionalDependencies?: DependencyMap;
    os?: string[];
    peerDependencies?: DependencyMap;
    preferGlobal?: boolean;
    private?: boolean;
    publishConfig?: PublishConfig;
    repository?: string | Repository;
    scripts?: ScriptsMap;
    version?: string;
    workspaces?: string[] | { [key:string]: string[] };
  }

  /**
   * An author or contributor
   */
  export interface Author {
    name: string;
    email?: string;
    homepage?: string;
  }

  /**
   * A map of exposed bin commands
   */
  export interface BinMap {
    [commandName: string]: string;
  }

  /**
   * A bugs link
   */
  export interface Bugs {
    email: string;
    url: string;
  }

  export interface Config {
    name?: string;
    config?: Object;
  }

  /**
   * A map of dependencies
   */
  export interface DependencyMap {
    [dependencyName: string]: string;
  }

  /**
   * CommonJS package structure
   */
  export interface Directories {
    lib?: string;
    bin?: string;
    man?: string;
    doc?: string;
    example?: string;
  }

  export interface Engines {
    node?: string;
    npm?: string;
  }

  export interface PublishConfig {
    registry?: string;
  }

  /**
   * A project repository
   */
  export interface Repository {
    type: string;
    url: string;
  }

  export interface ScriptsMap {
    [scriptName: string]: string;
  }
}
