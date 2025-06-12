import os

docs_path = './docs'
output_file = './utils/combined_docs.md'
file_extensions = ('.md', '.mdx')

# --- 제외할 파일 목록 (docs_path 기준 상대 경로 또는 절대 경로) ---
# os.path.normpath를 사용하여 경로 구분자를 OS에 맞게 정규화합니다.
excluded_files = [
    os.path.normpath('./docs/appendix/97.example-mermaid.md'),
    os.path.normpath('./docs/appendix/98.example-mermaid-sequence.md'),
    os.path.normpath('./docs/appendix/99.example.mdx'),
    # 여기에 제외하고 싶은 파일 경로를 추가하세요.
]
# --------------------------------------------------------------

# --- 제외할 폴더 목록 (docs_path 기준 상대 경로 또는 절대 경로) ---
# 예시: excluded_folders = ['./docs/skip_this_folder', './docs/another_folder_to_ignore']
# os.path.normpath를 사용하여 경로 구분자를 OS에 맞게 정규화합니다.
excluded_folders = [
    os.path.normpath('./docs/tech/deployment'),
    os.path.normpath('./docs/tech/contract'),
    # 여기에 제외하고 싶은 폴더 경로를 추가하세요.
]
# --------------------------------------------------------------


# 생성된 파일이 제외 목록에 포함되지 않도록 합니다.
excluded_files_absolute = [os.path.abspath(p) for p in excluded_files]
output_file_absolute = os.path.abspath(output_file)
if output_file_absolute not in excluded_files_absolute:
    excluded_files_absolute.append(output_file_absolute)

# 제외할 폴더 목록도 절대 경로로 변환합니다.
excluded_folders_absolute = [os.path.abspath(p) for p in excluded_folders]

print(f"결합된 파일을 저장할 경로: {output_file_absolute}")
print(f"제외할 파일 목록 (절대 경로 기준): {excluded_files_absolute}")
print(f"제외할 폴더 목록 (절대 경로 기준): {excluded_folders_absolute}")


# define custom order @logan
custom_order = [
    "introduction",
    "market_problem",
    "KASH-basic",
    "gold_mining",
    "RWA",
    "KASH-mechanism",
    "tokenomics",
    "tech/staking",
    "tech/rbs"
]

def custom_sort_key(name):
    try:
        return custom_order.index(name)
    except ValueError:
        # custom_order에 없는 경우, 리스트 길이 + 첫 글자의 ASCII 값으로 정렬 (알파벳 순서 유지)
        return len(custom_order) + ord(name[0].lower()) if name else len(custom_order)


with open(output_file, 'w', encoding='utf-8') as outfile:
    for root, dirs, files in os.walk(docs_path):
        # --- 폴더 제외 로직 ---
        # 현재 root를 기준으로 각 dir의 전체 경로를 만듭니다.
        # 이 전체 경로가 excluded_folders 또는 excluded_folders_absolute에 있는지 확인합니다.
        # 주의: dirs[:] = ... 와 같이 슬라이스 할당을 사용해야 os.walk가 수정된 목록을 사용합니다.
        dirs_to_visit_before_sort = []
        for d in dirs:
            dir_path_relative = os.path.join(root, d)
            dir_path_absolute = os.path.abspath(dir_path_relative)
            normalized_dir_path = os.path.normpath(dir_path_relative)

            if normalized_dir_path in excluded_folders or \
               dir_path_absolute in excluded_folders_absolute:
                print(f"Skipping excluded directory: {dir_path_relative}")
                continue
            dirs_to_visit_before_sort.append(d)
        
        # 사용자 정의 순서로 디렉토리 정렬 (제외된 폴더는 이미 걸러짐)
        dirs_to_visit_before_sort.sort(key=lambda d: custom_sort_key(os.path.basename(d)))
        dirs[:] = dirs_to_visit_before_sort # os.walk가 방문할 하위 디렉토리 목록 업데이트
        # --- 폴더 제외 로직 끝 ---

        # 파일은 기본 이름순 정렬 (필요시 여기도 커스텀 정렬 가능)
        files.sort()

        for file in files:
            if file.endswith(file_extensions):
                filepath_relative = os.path.join(root, file)
                filepath_absolute = os.path.abspath(filepath_relative) # 절대 경로로 변환하여 비교

                # 정규화된 경로로 비교
                normalized_filepath = os.path.normpath(filepath_relative)

                if normalized_filepath in excluded_files or filepath_absolute in excluded_files_absolute:
                    print(f"Skipping excluded file: {filepath_relative}")
                    continue # 이 파일을 건너뛰고 다음 파일로

                outfile.write(f"\n\n--- FILE: {filepath_relative} ---\n\n") # 파일 구분자
                try:
                    with open(filepath_relative, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                    outfile.write("\n") # 파일 끝에 줄바꿈 추가
                except Exception as e:
                    print(f"Error reading file {filepath_relative}: {e}")
                    outfile.write(f"\n\n--- ERROR READING FILE: {filepath_relative} ---\nError: {e}\n\n")


print(f"'{output_file}' 파일이 생성되었습니다.")