export function parsePokemonId(id: number) {
  return "#" + id.toString().padStart(3, "0");
}

export function parsePokemonDescription(description: string | undefined) {
  if (!description) return "Entrada no encontrada.";
  return description.replace(/\n/g, " ");
}

export function parseNumber(object: unknown): number {
  return typeof object === "number" ? object : 0;
}
