package com.example.webservicesjavatest.Controller;

import com.example.webservicesjavatest.Service.TravelDestinationService;
import com.example.webservicesjavatest.Model.TravelDestination;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class TravelDestinationController {

    private final TravelDestinationService travelDestinationService;

    public TravelDestinationController(TravelDestinationService travelDestinationService) {
        this.travelDestinationService = travelDestinationService;
    }
    // Returns all travel destinations
    @GetMapping("/allDestinations")
    public ResponseEntity<List<TravelDestination>> getAllDestinations() {
        return ResponseEntity.ok(travelDestinationService.getAllDestinations());
    }

    // Returns all travel destinations by continent
    @GetMapping("/continent/{continent}")
    public ResponseEntity<List<TravelDestination>> getAllDestinationByContinent(@PathVariable String continent) {
        return ResponseEntity.ok(travelDestinationService.getDestinationByContinent(continent));
    }

    // Returns the travel destination with the given id
    @GetMapping("/{destinationId}")
    public ResponseEntity<TravelDestination> getDestination(@PathVariable String destinationId) {
        return travelDestinationService.getDestination(destinationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Adds a new travel destination
    @PostMapping("/destinations")
    public ResponseEntity<TravelDestination> addDestination(@RequestBody TravelDestination destination) {
        TravelDestination createdDestination = travelDestinationService.addDestination(destination);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDestination);
    }
}
