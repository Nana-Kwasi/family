package com.mamaafrica.ai.market.dto;

import com.mamaafrica.ai.market.SizeChartRow;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SizeChartRowDto(
        @NotBlank @Size(max = 32) String size,
        @Size(max = 32) String usChest,
        @Size(max = 32) String euChest,
        @Size(max = 32) String usLength,
        @Size(max = 32) String euLength
) {

    public static SizeChartRowDto from(SizeChartRow row) {
        return new SizeChartRowDto(row.getSize(), row.getUsChest(), row.getEuChest(),
                row.getUsLength(), row.getEuLength());
    }

    public SizeChartRow toEntity() {
        return new SizeChartRow(size, usChest, euChest, usLength, euLength);
    }
}
