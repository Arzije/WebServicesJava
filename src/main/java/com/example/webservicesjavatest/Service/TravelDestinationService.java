package com.example.webservicesjavatest.Service;

import com.example.webservicesjavatest.Model.TravelDestination;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
public class TravelDestinationService {
    // The path to the JSON data file

    private static final String JSON_FILE_PATH = "src/main/resources/data.json";
    private final ObjectMapper objectMapper;

    public TravelDestinationService() {
        objectMapper = new ObjectMapper();
    }

    // Returns a list of all travel destinations
    public List<TravelDestination> getAllDestinations() {
        try {
            File file = new File(JSON_FILE_PATH);
            if (file.exists()) {
                return objectMapper.readValue(file, new TypeReference<List<TravelDestination>>() {
                });
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    // Returns the travel destination with the given id
    public Optional<TravelDestination> getDestination(String destinationId) {
        List<TravelDestination> destinations = getAllDestinations();
        return destinations.stream().filter(destination -> destination.getId().equals(destinationId)).findFirst();
    }

    // Adds a new travel destination
    public TravelDestination addDestination(TravelDestination destination) {
        List<TravelDestination> destinations = getAllDestinations();
        destination.setId(UUID.randomUUID().toString());
        destinations.add(destination);
        saveDestinations(destinations);
        return destination;
    }

    // Saves the list of travel destinations to the JSON data file
    private void saveDestinations(List<TravelDestination> destinations) {
        try {
            objectMapper.writeValue(new File(JSON_FILE_PATH), destinations);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Returns a list of all travel destinations in the given continent
    public List<TravelDestination> getDestinationByContinent(String continent) {
        List<TravelDestination> destinations = getAllDestinations();
        return destinations.stream()
                .filter(destination -> destination.getContinent().equalsIgnoreCase(continent))
                .collect(Collectors.toList());
    }

}
