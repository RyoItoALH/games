package com.example.gemes.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gemes.entity.Typing;
import com.example.gemes.model.TypingDto;
import com.example.gemes.repository.TypingRepository;

@Service
public class TypingService {

    @Autowired
    TypingRepository typingRepository;

    /**
     * リストを取得する
     *
     * @return List<TypingDto>　タイピングリスト
     */
    public List<TypingDto> getList(Integer num) {

        // ファイル名を全取得し、番号で選択
        String[] fileNames = typingRepository.getFileNames();
        List<Typing> result = typingRepository.getAllList(fileNames[num]);

        // DTOに成形しランダムにListに詰める
        return shuffleList(TypingDto.generateFromEntity(result));
    }

    /**
     * リストの中身をランダムに生成する
     *
     * @return List<TypingDto> タイピングリスト
     */
    public List<TypingDto> shuffleList(List<TypingDto> typingList) {
        List<TypingDto> resultList = new ArrayList<>();
        for (int i = 0; i <= typingList.size(); i++) {
            Random rand = new Random();

            // 最大値を引数に指定
            int randomNum = rand.nextInt(typingList.size());
            resultList.add(typingList.get(randomNum));
        }
        return resultList;
    }
    
}
