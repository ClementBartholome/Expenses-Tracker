<?php 

class Expense extends AbstractEntity implements JsonSerializable {
    private $id;
    private $description;
    private $amount; 
    private $date;   
    private $category;

    public function jsonSerialize() {
        return [
            'id' => $this->getId(),
            'description' => $this->getDescription(),
            'amount' => $this->getAmount(),
            'date' => $this->getDate(),
            'category' => $this->getCategory(),
        ];
    }

    public function setCategory(string $category) : void {
        $this->category = $category;
    }

    public function getCategory() : string {
        return $this->category;
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
