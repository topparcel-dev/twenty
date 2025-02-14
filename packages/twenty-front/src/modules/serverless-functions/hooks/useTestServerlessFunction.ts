import { useBuildDraftServerlessFunction } from '@/settings/serverless-functions/hooks/useBuildDraftServerlessFunction';
import { useExecuteOneServerlessFunction } from '@/settings/serverless-functions/hooks/useExecuteOneServerlessFunction';
import { serverlessFunctionTestDataFamilyState } from '@/workflow/states/serverlessFunctionTestDataFamilyState';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isDefined } from 'twenty-shared';
import { sleep } from '~/utils/sleep';

export const useTestServerlessFunction = ({
  serverlessFunctionId,
  callback,
}: {
  serverlessFunctionId: string;
  callback?: (testResult: object) => void;
}) => {
  const [isTesting, setIsTesting] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const { executeOneServerlessFunction } = useExecuteOneServerlessFunction();
  const { buildDraftServerlessFunction } = useBuildDraftServerlessFunction();
  const [serverlessFunctionTestData, setServerlessFunctionTestData] =
    useRecoilState(serverlessFunctionTestDataFamilyState(serverlessFunctionId));

  const testServerlessFunction = async (shouldBuild = true) => {
    try {
      if (shouldBuild) {
        setIsBuilding(true);
        await buildDraftServerlessFunction({
          id: serverlessFunctionId,
        });
        setIsBuilding(false);
      }
      setIsTesting(true);
      await sleep(200); // Delay artificially to avoid flashing the UI
      const result = await executeOneServerlessFunction({
        id: serverlessFunctionId,
        payload: serverlessFunctionTestData.input,
        version: 'draft',
      });

      setIsTesting(false);

      if (isDefined(result?.data?.executeOneServerlessFunction?.data)) {
        callback?.(result?.data?.executeOneServerlessFunction?.data);
      }

      setServerlessFunctionTestData((prev) => ({
        ...prev,
        language: 'json',
        height: 300,
        output: {
          data: result?.data?.executeOneServerlessFunction?.data
            ? JSON.stringify(
                result?.data?.executeOneServerlessFunction?.data,
                null,
                4,
              )
            : undefined,
          duration: result?.data?.executeOneServerlessFunction?.duration,
          status: result?.data?.executeOneServerlessFunction?.status,
          error: result?.data?.executeOneServerlessFunction?.error
            ? JSON.stringify(
                result?.data?.executeOneServerlessFunction?.error,
                null,
                4,
              )
            : undefined,
        },
      }));
    } catch (error) {
      setIsBuilding(false);
      setIsTesting(false);
      throw error;
    }
  };

  return { testServerlessFunction, isTesting, isBuilding };
};
