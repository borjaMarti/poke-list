export function parsePokemonId(id: number) {
  return "#" + id.toString().padStart(3, "0");
}

export function parsePokemonDescription(description: string | undefined) {
  if (!description) return "Entrada no encontrada.";
  return description.replace(/\n/g, " ");
}

export function isNumber(object: unknown): boolean {
  return typeof object === "number" && object === object;
}
