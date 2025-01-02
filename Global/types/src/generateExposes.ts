import * as fs from "fs";
import * as path from "path";

// Función para generar las exposiciones de Module Federation
export function generateExposes({
  dirname,
  folder,
}: {
  dirname: string;
  folder: string;
}) {
  const componentsDir = path.join(dirname, "src", folder);
  const exposes: { [key: string]: string } = {};
  const components: { title: string; path: string; location: string }[] = [];

  // Función recursiva para recorrer el directorio y encontrar archivos index.tsx
  const traverseDirectory = (dir: string) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (file.isFile() && file.name === "index.tsx") {
        const relativePath = path
          .relative(componentsDir, fullPath)
          .replace(/\\/g, "/");
        const dirName = path.dirname(relativePath).replace(/\\/g, "/");
        exposes[`./${dirName}`] = `./src/${folder}/${dirName}`;
        components.push({
          title: dirName.split("/").at(-1) || "",
          location: `./src/${folder}/${dirName}`,
          path: `./${folder}/${dirName}`,
        });
      }
    });
  };

  // Iniciar la búsqueda de archivos index.tsx
  traverseDirectory(componentsDir);

  // Crear la carpeta json dentro de public si no existe
  const jsonDir = path.join(dirname, "public", "json");
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }

  // Escribir el archivo components.json con las rutas de los componentes
  fs.writeFileSync(
    path.join(dirname, "public", "json", "components.json"),
    JSON.stringify(components, null, 2)
  );
  // console.log(components, exposes);
  return exposes;
}
