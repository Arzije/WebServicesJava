package com.example.webservicesjavatest;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TravelDestinationControllerTest {

    @LocalServerPort
    private int port;

    @Test
    public void testGetDestinationById() {
        String destinationId = "b4cbdc26-0d4e-48dc-ad55-65bcb23671cc";
        given()
                .port(port)
                .when()
                .get("/api/" + destinationId)
                .then()
                .statusCode(200)
                .body("id", equalTo(destinationId))
                .body("destination", equalTo("Capetown"))
                .body("continent", equalTo("Africa"));
    }

    @Test
    public void testGetDestinationByContinent() {
        given()
                .port(port)
                .when()
                .get("/api/continent/Europe")
                .then()
                .statusCode(200)
                .body("size()", is(3))
                .body("[0].destination", equalTo("Stockholm"))
                .body("[0].continent", equalTo("Europe"));
    }

    @Test
    public void testAddDestination() {
        String requestBody = "{ \"destination\": \"London\", \"continent\": \"Europe\" }";
        given()
                .port(port)
                .contentType("application/json")
                .body(requestBody)
                .when()
                .post("/api/destinations")
                .then()
                .statusCode(201)
                .body("destination", equalTo("London"))
                .body("continent", equalTo("Europe"));
    }
}

