package com.mamaafrica.ai.market;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

/** One row of a garment's measurement table. Free text, because the units differ per region. */
@Embeddable
public class SizeChartRow {

    @Column(name = "size", nullable = false, length = 32)
    private String size;

    @Column(name = "us_chest", length = 32)
    private String usChest;

    @Column(name = "eu_chest", length = 32)
    private String euChest;

    @Column(name = "us_length", length = 32)
    private String usLength;

    @Column(name = "eu_length", length = 32)
    private String euLength;

    protected SizeChartRow() {
    }

    public SizeChartRow(String size, String usChest, String euChest, String usLength, String euLength) {
        this.size = size;
        this.usChest = usChest;
        this.euChest = euChest;
        this.usLength = usLength;
        this.euLength = euLength;
    }

    public String getSize() {
        return size;
    }

    public String getUsChest() {
        return usChest;
    }

    public String getEuChest() {
        return euChest;
    }

    public String getUsLength() {
        return usLength;
    }

    public String getEuLength() {
        return euLength;
    }
}
