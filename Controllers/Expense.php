<?php 

require_once 'Models/Model.php';
require_once "AbstractEntity.php";

class Expense extends AbstractEntity implements JsonSerializable {
    private $id;
    private $description;
    private $amount;  // Change the property type to float
    private $date;    // Change the property type to string

    public function jsonSerialize() {
        return [
            'id' => $this->getId(),
            'description' => $this->getDescription(),
            'amount' => $this->getAmount(),
            'date' => $this->getDate(),
        ];
    }

    public function setDescription(string $description): void {
        $this->description = $description;
    }

    public function getDescription(): string {
        return $this->description;
    }

    public function setAmount(float $amount): void {
        $this->amount = $amount;
    }

    public function getAmount(): float { 
        return $this->amount;
    }

    public function setDate(string $date): void {  
        $this->date = $date;
    }

    public function getDate(): string { 
        return $this->date;
    }

    public function getId(): int {
        return $this->id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }
}
