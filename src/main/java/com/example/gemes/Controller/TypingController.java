package com.example.gemes.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.gemes.model.TypingDto;
import com.example.gemes.service.TypingService;

@Controller
public class TypingController {
    @Autowired
    TypingService typingService;


    /**
     * タイピングリストを1個取得
     * 
     * @return List<TypingDto>
     */
    @GetMapping(path = "/typingList")
    @ResponseBody
    public List<TypingDto> getTypingList(@RequestParam Integer num){
        List<TypingDto> test =  typingService.getList(num);
        return test;
    }
    
}
