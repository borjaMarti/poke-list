import { expect, test } from "vitest";
import { parsePokemonId, parsePokemonDescription } from "./utils";

test("Parse Pokemon Id", () => {
  expect(parsePokemonId(1)).toBe("#001");
  expect(parsePokemonId(24)).toBe("#024");
  expect(parsePokemonId(151)).toBe("#151");
});

test("Parse Pokemon Description", () => {
  expect(parsePokemonDescription("Escupe fuego\npor la boca.")).toBe(
    "Escupe fuego por la boca.",
  );
  expect(parsePokemonDescription("\n")).toBe(" ");
  expect(parsePokemonDescription("Es\nuna\nsemilla.")).toBe("Es una semilla.");
});
