export function parsePokemonId(id: number) {
  return "#" + id.toString().padStart(3, "0");
}

export function parsePokemonDescription(description: string) {
  return description.replace(/\n/g, " ");
}
