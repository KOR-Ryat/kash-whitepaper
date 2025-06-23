import os
import argparse

# ====================================================================================
# --- 전역 설정 (Global Configurations) ---
# 모든 프리셋에 공통으로 적용되는 설정입니다.
# ====================================================================================

# 1. 처리할 파일 확장자
FILE_EXTENSIONS = ('.md', '.mdx')

# 2. 전역적으로 제외할 파일 목록
# 여기에 명시된 파일은 어떤 프리셋에서도 포함되지 않습니다.
EXCLUDED_FILES = [
    './docs/appendix/97.example-mermaid.md',
    './docs/appendix/98.example-mermaid-sequence.md',
    './docs/appendix/99.example.mdx',
]

# 3. 문서 전체의 순서를 정의하는 마스터 리스트 (Master Order)
# 여기에 폴더 경로를 상대 경로로 명시하면, 스크립트가 이 순서대로 파일을 결합합니다.
# 여기에 없는 폴더는 목록의 맨 뒤에 알파벳 순으로 추가됩니다.
MASTER_ORDER = [
    './docs/whitepaper',
    './docs/whitepaper/introduction',
    './docs/whitepaper/market_problem',
    './docs/whitepaper/KASH-basic',
    './docs/whitepaper/gold_mining',
    './docs/whitepaper/RWA',
    './docs/whitepaper/KASH-mechanism',
    './docs/whitepaper/tokenomics',
    
    './docs/tech',
    './docs/tech/reserve',
    './docs/tech/staking',
    './docs/tech/rbs',
    './docs/tech/contract',
    './docs/tech/deployment',
    './docs/tech/security',
    
    './docs/appendix',
    
    './i18n/en/docusaurus-plugin-content-docs/current/',
]

# ====================================================================================
# --- 프리셋 설정 (Preset Filters) ---
# 각 프리셋은 이제 '필터' 역할을 합니다.
# docs_path: 이 경로 하위에 있는 파일만 포함합니다.
# excluded_folders: 이 경로 하위에 있는 파일은 제외합니다.
# ====================================================================================
PRESETS = {
    "korean_docs": {
        "description": "국문 문서 전체",
        "docs_path": './docs',
        "excluded_folders": [],
    },
    "korean_whitepaper": {
        "description": "국문 백서 핵심",
        "docs_path": './docs/whitepaper',
        "excluded_folders": [],
    },
    "korean_yellowpaper": {
        "description": "국문 기술 백서",
        "docs_path": './docs/tech',
        "excluded_folders": [],
    },
    "english_docs": {
        "description": "영문 문서 전체",
        "docs_path": './i18n/en/docusaurus-plugin-content-docs/current',
        "excluded_folders": [],
    },
    "english_whitepaper": {
        "description": "영문 백서 핵심",
        "docs_path": './i18n/en/docusaurus-plugin-content-docs/current/whitepaper',
        "excluded_folders": [],
    },
    "english_yellowpaper": {
        "description": "영문 기술 백서",
        "docs_path": './i18n/en/docusaurus-plugin-content-docs/current/tech',
        "excluded_folders": [],
    },
}


def get_master_sorted_files():
    """
    프로젝트 내의 모든 문서를 MASTER_ORDER에 따라 정렬하여 리스트로 반환합니다.
    """
    print("마스터 파일 목록 생성 중...")
    all_files = []
    # 프로젝트 루트(.)에서부터 모든 파일을 탐색
    for root, _, files in os.walk('.', topdown=True):
        for file in files:
            if file.endswith(FILE_EXTENSIONS):
                all_files.append(os.path.normpath(os.path.join(root, file)))

    master_order_abs = [os.path.abspath(os.path.normpath(p)) for p in MASTER_ORDER]
    unmatched_folders = set()

    def sort_key(filepath):
        dir_path = os.path.abspath(os.path.dirname(filepath))
        try:
            # 파일이 속한 폴더의 순서 + 파일 이름으로 정렬
            idx = master_order_abs.index(dir_path)
            return (idx, filepath)
        except ValueError:
            unmatched_folders.add(dir_path)
            # 순서가 지정되지 않은 폴더는 뒤로 보내고, 그 안에서는 경로명으로 정렬
            return (len(master_order_abs), dir_path, filepath)

    sorted_files = sorted(all_files, key=sort_key)

    # if unmatched_folders:
    #     print("\n[정렬 정보] 다음 폴더는 MASTER_ORDER에 정의되지 않아 기본 순서로 정렬되었습니다:")
    #     # 프로젝트 루트 기준 상대 경로로 변환하여 출력
    #     project_root_abs = os.path.abspath('.')
    #     for folder in sorted(list(unmatched_folders)):
    #         print(f"  - {os.path.relpath(folder, project_root_abs).replace(os.sep, '/')}")
    
    print("마스터 파일 목록 생성 완료.\n")
    return sorted_files


def generate_combined_docs(preset_config, preset_name, all_sorted_files, excluded_files_global_abs):
    """
    미리 정렬된 전체 파일 목록에서 프리셋 조건에 맞는 파일만 필터링하여 결합합니다.
    """
    print(f"--- '{preset_name}' 프리셋 실행 ---")
    print(f"설명: {preset_config.get('description', '설명 없음')}")

    # --- 프리셋 필터 설정 ---
    docs_path = preset_config.get('docs_path')
    excluded_folders = preset_config.get('excluded_folders', [])

    if not docs_path:
        print(f"경고: '{preset_name}' 프리셋에 'docs_path'가 정의되지 않았습니다. 건너뜁니다.")
        return

    output_file = os.path.normpath(f'./utils/combine_result/{preset_name}.md')
    output_file_abs = os.path.abspath(output_file)
    
    # 프리셋별 경로들을 절대 경로로 변환
    docs_path_abs = os.path.abspath(os.path.normpath(docs_path))
    excluded_folders_abs = [os.path.abspath(os.path.normpath(p)) for p in excluded_folders]

    print(f"\n결합된 파일을 저장할 경로: {output_file_abs}")

    output_dir = os.path.dirname(output_file_abs)
    os.makedirs(output_dir, exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as outfile:
        if not os.path.exists(docs_path_abs):
            print(f"경고: '{docs_path}' 경로를 찾을 수 없습니다. 이 프리셋을 건너뜁니다.")
            outfile.write(f"# 오류: 입력 경로 '{docs_path}'를 찾을 수 없습니다.")
            return
        
        # 정렬된 전체 파일 목록을 순회하며 필터링
        for filepath in all_sorted_files:
            filepath_abs = os.path.abspath(filepath)
            
            # 필터 1: 파일이 docs_path 하위에 있는가?
            if not filepath_abs.startswith(docs_path_abs):
                continue

            # 필터 2: 전역 제외 파일 또는 출력 파일 자신인가?
            if filepath_abs in excluded_files_global_abs or filepath_abs == output_file_abs:
                continue

            # 필터 3: 프리셋의 제외 폴더 하위에 있는가?
            is_excluded = False
            for excluded_folder_abs in excluded_folders_abs:
                if filepath_abs.startswith(excluded_folder_abs):
                    is_excluded = True
                    break
            if is_excluded:
                continue

            # 모든 필터를 통과한 파일만 결합
            outfile.write(f"\n\n--- FILE: {filepath} ---\n\n")
            try:
                with open(filepath, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
                outfile.write("\n")
            except Exception as e:
                print(f"파일 읽기 오류 {filepath}: {e}")
                outfile.write(f"\n\n--- ERROR READING FILE: {filepath} ---\nError: {e}\n\n")

    print(f"성공: '{output_file}' 파일이 생성되었습니다.")


if __name__ == "__main__":
    # 스크립트 시작 시 단 한번, 모든 파일을 찾아 마스터 순서에 따라 정렬
    master_sorted_files = get_master_sorted_files()
    
    # 전역 제외 파일 목록을 절대 경로로 변환
    excluded_files_global_abs = [os.path.abspath(os.path.normpath(p)) for p in EXCLUDED_FILES]

    parser = argparse.ArgumentParser(description="지정된 프리셋에 따라 문서들을 하나의 파일로 결합합니다.")
    parser.add_argument(
        "preset_name",
        nargs='?',
        default=None,
        choices=list(PRESETS.keys()) + [None],
        help=f"실행할 프리셋의 이름. 생략 시 모든 프리셋을 실행합니다. 선택 가능: {', '.join(PRESETS.keys())}"
    )
    args = parser.parse_args()

    if args.preset_name:
        print(f"지정된 프리셋 '{args.preset_name}'을(를) 실행합니다.")
        selected_preset_config = PRESETS[args.preset_name]
        generate_combined_docs(selected_preset_config, args.preset_name, master_sorted_files, excluded_files_global_abs)
    else:
        print("프리셋이 지정되지 않았습니다. 정의된 모든 프리셋을 실행합니다.")
        for name, config in PRESETS.items():
            print("\n" + "="*70)
            generate_combined_docs(config, name, master_sorted_files, excluded_files_global_abs)
        print("\n" + "="*70)
        print("모든 프리셋 작업이 완료되었습니다.")