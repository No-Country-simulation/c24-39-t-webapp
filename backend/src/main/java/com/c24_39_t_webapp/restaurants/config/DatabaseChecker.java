package com.c24_39_t_webapp.restaurants.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

    @Component
    public class DatabaseChecker implements CommandLineRunner {

        private final JdbcTemplate jdbcTemplate;

        public DatabaseChecker(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        @Override
        public void run(String... args) throws Exception {
            try {
                int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM information_schema.tables", Integer.class);
                System.out.println("✅ Conexión exitosa. Número de tablas en la base de datos: " + count);
            } catch (Exception e) {
                System.err.println("❌ Error en la conexión a la base de datos: " + e.getMessage());
            }
        }
    }