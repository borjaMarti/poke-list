import { expect, test } from "vitest";
import { parsePokemonId, parsePokemonDescription, isNumber } from "./utils";

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
  expect(parsePokemonDescription("")).toBe("Entrada no encontrada.");
});

test("Is Number", () => {
  expect(isNumber(7)).toBe(true);
  expect(isNumber(42)).toBe(true);
  expect(isNumber(0)).toBe(true);
  expect(isNumber(-99999)).toBe(true);
  expect(isNumber(null)).toBe(false);
  expect(isNumber(undefined)).toBe(false);
  expect(isNumber(NaN)).toBe(false);
  expect(isNumber([])).toBe(false);
  expect(isNumber({})).toBe(false);
});
