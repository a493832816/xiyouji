import { describe, it, expect } from 'vitest';
import { points, routePath, terrainPaths, factionZones, legends, mapMeta } from '../../src/poi-data.js';

describe('poi-data.js', () => {
  describe('points', () => {
    it('should be an array', () => {
      expect(Array.isArray(points)).toBe(true);
    });

    it('should have valid structure for each point', () => {
      points.forEach(point => {
        expect(point).toHaveProperty('id');
        expect(point).toHaveProperty('name');
        expect(point).toHaveProperty('x');
        expect(point).toHaveProperty('y');
        expect(point).toHaveProperty('t');
        expect(typeof point.id).toBe('string');
        expect(typeof point.name).toBe('string');
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThanOrEqual(100);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(100);
      });
    });

    it('should have unique ids', () => {
      const ids = points.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe('routePath', () => {
    it('should be an array', () => {
      expect(Array.isArray(routePath)).toBe(true);
    });

    it('should have valid route point structure', () => {
      routePath.forEach(point => {
        expect(point).toHaveProperty('x');
        expect(point).toHaveProperty('y');
        expect(point).toHaveProperty('name');
        expect(typeof point.x).toBe('number');
        expect(typeof point.y).toBe('number');
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThanOrEqual(100);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('terrainPaths', () => {
    it('should be an array', () => {
      expect(Array.isArray(terrainPaths)).toBe(true);
    });
  });

  describe('factionZones', () => {
    it('should be an array', () => {
      expect(Array.isArray(factionZones)).toBe(true);
    });
  });

  describe('legends', () => {
    it('should be an array', () => {
      expect(Array.isArray(legends)).toBe(true);
    });
  });

  describe('mapMeta', () => {
    it('should have required properties', () => {
      expect(mapMeta).toHaveProperty('title');
      expect(mapMeta).toHaveProperty('imagePath');
    });
  });
});
