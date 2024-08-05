package com.example.gemes.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.example.gemes.entity.Typing;

@Getter
@Setter
public class TypingDto {
    private Integer id;
    private String spell;
    private String viewName;
    
    public static List<TypingDto> generateFromEntity(List<Typing> typingEntity) {
        List<TypingDto> typingDtoList = new ArrayList<>();
        for (Typing typing : typingEntity) {
            TypingDto typingDto = new TypingDto();
            typingDto.setId(typing.getId());
            typingDto.setSpell(typing.getSpell());
            typingDto.setViewName(typing.getViewName());
            typingDtoList.add(typingDto);
        }
        return typingDtoList;
    }
}
