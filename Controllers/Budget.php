<?php

require_once 'Models/Model.php';
require_once "AbstractEntity.php";

class Budget extends AbstractEntity implements JsonSerializable {
    private $id;
    private $month;
    private $year;
    private $budget;

    public function jsonSerialize() {
        return [
            'id' => $this->getId(),
            'month' => $this->getMonth(),
            'year' => $this->getYear(),
            'budget' => $this->getBudget(),
        ];
    }

    public function setMonth(int $month): void {
        $this->month = $month;
    }

    public function getMonth(): int {
        return $this->month;
    }

    public function setYear(int $year): void {
        $this->year = $year;
    }

    public function getYear(): int {
        return $this->year;
    }

    public function setBudget(float $budget): void {
        $this->budget = $budget;
    }

    public function getBudget(): float {
        return $this->budget;
    }

    public function getId(): int {
        return $this->id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }
}
