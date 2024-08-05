package com.example.gemes.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import com.example.gemes.model.TypingDto;
import com.example.gemes.service.TypingService;
import java.util.List;

@Controller
public class MainController {
    
    @Autowired
    TypingService typingService;

    @GetMapping(value = "/")
    public ModelAndView top(){
        ModelAndView mav = new ModelAndView();
        List<List<TypingDto>> typingList = typingService.getList();
        mav.addObject("typingList", typingList);
        mav.setViewName("top");
        return mav;
    }
    
    
}
