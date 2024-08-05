package com.example.gemes.repository;

import org.springframework.stereotype.Repository;

import com.example.gemes.entity.Typing;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@Repository
public class TypingRepository {

    /**
     * ディレクトリー名前を取得
     *
     * @return String[]=ファイル名
     */
    public String[] getFileNames() {
        String[] array = new String[3];
        //Fileクラスのオブジェクトを生成する
        File dir = new File("src/main/resources/static/file/");

        //listFilesメソッドを使用して一覧を取得する
        File[] list = dir.listFiles();
        if (list != null) {
            for (int i = 0; i < Math.min(list.length, 3); i++) {
                array[i] = list[i].getName(); // ファイル名を配列に追加
            }
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
        try {
            File file = new File("src/main/resources/static/file/" + fileName);

            if (file.exists()) {
                FileReader fr = new FileReader(file, StandardCharsets.UTF_8);
                BufferedReader br = new BufferedReader(fr);
                String content;
                int count = 0;
                while ((content = br.readLine()) != null) {
                    String[] parts = content.split(",");
                    Typing typing = new Typing();
                    typing.setId(++count);
                    typing.setViewName(parts[0]);
                    typing.setSpell(parts[1]);
                    result.add(typing);
                }
                br.close();
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
        String filePath = "src/main/resources/static/file/" + fileName; // ファイルのパスを指定
        int lineCount = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            while (br.readLine() != null) {
                lineCount++;
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return lineCount;
    }
    
}
