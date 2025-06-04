import os

docs_path = './docs'
output_file = './utils/combined_docs.md'
file_extensions = ('.md', '.mdx')

# --- 제외할 파일 목록 (docs_path 기준 상대 경로 또는 절대 경로) ---
# 예시: excluded_files = ['./docs/some_folder/exclude_this.md', './docs/another_folder/do_not_include_this.mdx']
# os.path.normpath를 사용하여 경로 구분자를 OS에 맞게 정규화합니다.
excluded_files = [
    os.path.normpath('./docs/91.appendix/99.example.mdx'),
    # 여기에 제외하고 싶은 파일 경로를 추가하세요.
]
# --------------------------------------------------------------

# 생성된 파일이 제외 목록에 포함되지 않도록 합니다.
# output_file의 절대 경로를 구해서 excluded_files_absolute에 추가합니다.
excluded_files_absolute = [os.path.abspath(p) for p in excluded_files]
output_file_absolute = os.path.abspath(output_file)
if output_file_absolute not in excluded_files_absolute:
    excluded_files_absolute.append(output_file_absolute)


print(f"결합된 파일을 저장할 경로: {output_file_absolute}")
print(f"제외할 파일 목록 (절대 경로 기준): {excluded_files_absolute}")

# define custom order @logan
custom_order = [
    "introduction",
    "market_problem",
    "KASH-basic",
    "gold_mining",
    "RWA",
    "KASH-mechanism",
    "tokenomics",
    "12.staking",
    "13.rbs"
]

def custom_sort_key(name):
    try:
        return custom_order.index(name)
    except ValueError:
        return len(custom_order) + ord(name[0])


with open(output_file, 'w', encoding='utf-8') as outfile:
    for root, dirs, files in os.walk(docs_path):
        # 제외할 디렉토리 (선택 사항, 필요시 추가)
        # dirs[:] = [d for d in dirs if os.path.join(root, d) not in excluded_directories]
        # dirs.sort()
        # 파일을 사용자 정의 순서로 정렬 @logan
        dirs.sort(key=lambda d: custom_sort_key(os.path.basename(d)))
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
                    # 'utf-роваться'는 오타로 보입니다. 'utf-8'로 수정합니다.
                    with open(filepath_relative, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                    outfile.write("\n") # 파일 끝에 줄바꿈 추가
                except Exception as e:
                    print(f"Error reading file {filepath_relative}: {e}")
                    outfile.write(f"\n\n--- ERROR READING FILE: {filepath_relative} ---\nError: {e}\n\n")


print(f"'{output_file}' 파일이 생성되었습니다.")