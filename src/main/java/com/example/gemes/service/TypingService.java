package com.example.gemes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gemes.entity.Typing;
import com.example.gemes.model.TypingDto;
import com.example.gemes.repository.TypingRepository;
import java.util.Random;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypingService {

    @Autowired
    TypingRepository typingRepository;

    /**
     * リストを取得する
     *
     * @return List<TypingDto>　タイピングリスト
     */
    public List<List<TypingDto>> getList() {
        List<List<TypingDto>> resultList = new ArrayList<>();
        String[] fileNames = typingRepository.getFileNames();
        for (String fileName : fileNames) {
            List<Typing> result = typingRepository.getAllList(fileName);
            List<TypingDto> typingDto = shuffleList(TypingDto.generateFromEntity(result), fileName);
            resultList.add(typingDto);
        }
        return resultList;
    }

    /**
     * リストの中身をランダムに50個生成する
     *
     * @return List<TypingDto> タイピングリスト
     */
    public List<TypingDto> shuffleList(List<TypingDto> typingList, String fileName) {
        List<TypingDto> resultList = new ArrayList<>();
        Integer fileLength = typingRepository.getFileLength(fileName);
        for (int i = 0; i <= 49; i++) {
            Random rand = new Random();
            int randomNum = rand.nextInt(fileLength);
            resultList.add(typingList.get(randomNum));
        }
        return resultList;
    }
    
}
