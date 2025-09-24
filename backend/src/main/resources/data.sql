INSERT INTO region (id, nombre) VALUES (1, 'Región Metropolitana');
INSERT INTO region (id, nombre) VALUES (2, 'Región de Valparaíso');

INSERT INTO comuna (id, nombre, region_id) VALUES (1, 'Santiago', 1);
INSERT INTO comuna (id, nombre, region_id) VALUES (2, 'Providencia', 1);
INSERT INTO comuna (id, nombre, region_id) VALUES (3, 'Viña del Mar', 2);