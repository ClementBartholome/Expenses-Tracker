<?php 

abstract class AbstractEntity {
    public function hydrate(array $data) {
        // Loop through the associative array of data
        foreach ($data as $key => $value) {
            // Generate the setter method name based on the property name
            $method = 'set' . ucfirst($key);
            // Check if the setter method exists in the current class
            if (method_exists($this, $method)) {
                // If the setter method exists, call it with the corresponding value
                $this->$method($value);
            }
        }
    }
}
