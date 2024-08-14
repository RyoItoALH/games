package com.example.gemes.repository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.gemes.entity.Typing;


@Repository
public class TypingRepository {
    private static final String DIRECTORY_PATH = "src/main/resources/static/file/";

    /**
     * ファイル名一覧を取得
     *
     * @return String[]=ファイル名
     */
    public String[] getFileNames() {
        File dir = new File(DIRECTORY_PATH);
        File[] list = dir.listFiles();

        // 中身がない時は空配列を返す
        if (list == null) {
            return new String[0];
        }
        String[] array = new String[Math.min(list.length, 3)];
        for (int i = 0; i < array.length; i++) {
            array[i] = list[i].getName();
        }
        return array;
    }

    /**
     * ファイル読み込みリストで出力
     *
     * @return List<TypingDTO> タイピングリスト
     */
    public List<Typing> getAllList(String fileName) {
        List<Typing> result = new ArrayList<>();
        File file = new File(DIRECTORY_PATH + fileName);
        if (!file.exists()) {
            return result; // ファイルが存在しない場合は空のリストを返す
        }
        try (BufferedReader br = new BufferedReader(new FileReader(file, StandardCharsets.UTF_8))) {
            String content;
            int count = 0;
            while ((content = br.readLine()) != null) {
                String[] parts = content.split(",");
                if (parts.length >= 2) { // データが不足していないかチェック
                    Typing typing = new Typing();
                    typing.setId(++count);
                    typing.setViewName(parts[0]);
                    typing.setSpell(parts[1]);
                    result.add(typing);
                }
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return result;
    }
    

    /**
     * ファイルの行数をカウント
     *
     * @return Integer ファイルの行数
     */
    public Integer getFileLength(String fileName) {
        File file = new File(DIRECTORY_PATH + fileName);
        if (!file.exists()) {
            return 0; // ファイルが存在しない場合は 0 を返す
        }
        int lineCount = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            while (br.readLine() != null) {
                lineCount++;
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return lineCount;
    }
}
